from django.conf.urls import url
from rest_framework_jwt.views import (obtain_jwt_token, refresh_jwt_token,
                                      verify_jwt_token)

from rest_framework.urlpatterns import format_suffix_patterns

from bucketlist.api import (BucketlistViewSet, ItemlistViewSet,
                            schema_view, UserRegister)


urlpatterns = [
    url(r'^login/$', obtain_jwt_token, name='login'),
    url(r'^register/$',
        UserRegister.as_view({'post': 'create'}), name='register'),
    url(r'^token-verify/', verify_jwt_token),
    url(r'^token-refresh/', refresh_jwt_token),
    url(r'^bucketlists/$',
        BucketlistViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='bucketlists'),
    url(r'^bucketlists/(?P<pk>[0-9]+)/$',
        BucketlistViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy'}),
        name='one_bucketlist'),
    url(r'^bucketlists/(?P<bucketlist_id>[0-9]+)/items/$',
        ItemlistViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='items'),
    url(r'^bucketlists/(?P<bucketlist_id>[0-9]+)/items/(?P<pk>[0-9]+)$',
        ItemlistViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy'}), name='one_item'),
    url(r'^$', schema_view),
]

urlpatterns = format_suffix_patterns(urlpatterns)
