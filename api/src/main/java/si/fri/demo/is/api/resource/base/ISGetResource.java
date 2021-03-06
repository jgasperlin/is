package si.fri.demo.is.api.resource.base;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import si.fri.demo.is.api.ISApiCore;
import si.fri.demo.is.api.data.request.IdRequest;
import si.fri.demo.is.api.data.request.base.ISApiBaseRequest;
import si.fri.demo.is.api.data.response.EntityResponse;
import si.fri.demo.is.api.data.response.PagingResponse;
import si.fri.demo.is.api.exception.ISApiException;
import si.fri.demo.is.core.jpa.entities.base.BaseEntity;


public class ISGetResource<T extends BaseEntity> extends ISResource<T> {

    public ISGetResource(ISApiCore core, Class<T> type) {
        super(core, type);
    }

    public PagingResponse<T> get(String queryParams) throws ISApiException {
        String url = endpointUrl + queryParams;
        HttpGet get = new HttpGet(url);
        setHeaders(get, new ISApiBaseRequest());
        HttpResponse response = core.getClient().execute(get);

        return buildVcgPaging(response);
    }

    public EntityResponse<T> getById(Integer id) throws ISApiException {
        return getById(new IdRequest(id));
    }
    public EntityResponse<T> getById(IdRequest idRequest) throws ISApiException {
        Integer id = idRequest.getId();
        checkId(id);

        String url = endpointUrl + "/" + id;
        HttpGet get = new HttpGet(url);
        setHeaders(get, idRequest);
        HttpResponse response = core.getClient().execute(get);

        return buildVcgEntity(response);
    }

    protected void checkId(Integer id) throws ISApiException {
        if(id == null){
            throw new ISApiException("Id can not be null");
        }
    }

}
